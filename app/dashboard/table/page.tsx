'use client'

import * as React from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  Row,
  Column,
} from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { ChevronDown, MoreHorizontal, Pen, Trash, Eye } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Toaster } from "@/components/ui/toaster"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

// 定义数据类型
type User = {
  id: number
  name: string
  email: string
  role: string
  status: string
}

// 定义表单验证 schema
const userFormSchema = z.object({
  name: z.string()
    .min(2, { message: "姓名至少需要2个字符" })
    .max(30, { message: "姓名不能超过30个字符" })
    .regex(/^[a-zA-Z0-9\u4e00-\u9fa5\s]+$/, { message: "姓名只能包含字母、数字、中文和空格" }),
  email: z.string()
    .email({ message: "请输入有效的邮箱地址" })
    .min(5, { message: "邮箱地址太短" })
    .max(100, { message: "邮箱地址太长" }),
  role: z.enum(["Admin", "User"], {
    required_error: "请选择角色",
    invalid_type_error: "角色选择无效",
  }),
  status: z.enum(["Active", "Inactive"], {
    required_error: "请选择状态",
    invalid_type_error: "状态选择无效",
  }),
})

export default function TablePage() {
  const { toast } = useToast()
  const [users, setUsers] = React.useState<User[]>([])
  const [loading, setLoading] = React.useState(true)
  const [editingUser, setEditingUser] = React.useState<User | null>(null)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = React.useState(false)
  const [userToDelete, setUserToDelete] = React.useState<User | null>(null)
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState({})
  const [isViewMode, setIsViewMode] = React.useState(false)

  // 定义表单
  const form = useForm<z.infer<typeof userFormSchema>>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      name: "",
      email: "",
      role: "User",
      status: "Active",
    },
  })

  // 重置表单
  const resetForm = (user?: User) => {
    if (user) {
      form.reset({
        name: user.name,
        email: user.email,
        role: user.role as "Admin" | "User",
        status: user.status as "Active" | "Inactive",
      })
    } else {
      form.reset({
        name: "",
        email: "",
        role: "User",
        status: "Active",
      })
    }
  }

  // 处理表单提交
  const onSubmit = async (values: z.infer<typeof userFormSchema>) => {
    try {
      // 检查邮箱是否已存在
      if (!editingUser) {
        const emailExists = users.some(user => user.email === values.email)
        if (emailExists) {
          toast({
            title: "错误",
            description: "该邮箱已被使用",
            variant: "destructive",
          })
          return
        }
      }

      const userData = {
        ...values,
        id: editingUser?.id,
      }

      const method = userData.id ? 'PUT' : 'POST'
      const response = await fetch('/api/users', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      })
      
      if (!response.ok) {
        throw new Error(await response.text())
      }
      
      toast({
        title: "成功",
        description: userData.id ? "用户更新成功" : "用户创建成功",
      })
      
      fetchUsers()
      setEditingUser(null)
      form.reset()
    } catch (error) {
      toast({
        title: "错误",
        description: error instanceof Error ? error.message : "保存用户数据失败",
        variant: "destructive",
      })
    }
  }

  // 修改编辑用户的处理函数
  const handleEditUser = (user: User, isView: boolean = false) => {
    setEditingUser(user)
    setIsViewMode(isView)
    resetForm(user)
  }

  // 获取用户数据
  const fetchUsers = async () => {
    try {
      const response = await fetch('/api/users')
      const data = await response.json()
      setUsers(data)
    } catch (error) {
      toast({
        title: "错误",
        description: "获取用户数据失败",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  // 创建/更新用户
  const saveUser = async (userData: Partial<User>) => {
    try {
      const method = userData.id ? 'PUT' : 'POST'
      const response = await fetch('/api/users', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      })
      
      if (!response.ok) throw new Error('保存失败')
      
      toast({
        title: "成功",
        description: userData.id ? "用户更新成功" : "用户创建成功",
      })
      
      fetchUsers()
      setEditingUser(null)
    } catch (error) {
      toast({
        title: "错误",
        description: "保存用户数据失败",
        variant: "destructive",
      })
    }
  }

  // 删除用户
  const deleteUser = async (id: number) => {
    try {
      const response = await fetch(`/api/users?id=${id}`, {
        method: 'DELETE',
      })
      
      if (!response.ok) throw new Error('删除失败')
      
      toast({
        title: "成功",
        description: "用户删除成功",
      })
      
      fetchUsers()
    } catch (error) {
      toast({
        title: "错误",
        description: "删除用户失败",
        variant: "destructive",
      })
    } finally {
      setIsDeleteDialogOpen(false)
      setUserToDelete(null)
    }
  }

  React.useEffect(() => {
    fetchUsers()
  }, [])

  // 定义列
  const columns: ColumnDef<User>[] = [
    {
      accessorKey: "id",
      header: "ID",
      cell: ({ row }: { row: Row<User> }) => <div className="w-[80px]">{row.getValue("id")}</div>,
    },
    {
      accessorKey: "name",
      header: "姓名",
      cell: ({ row }) => <div>{row.getValue("name")}</div>,
    },
    {
      accessorKey: "email",
      header: "邮箱",
      cell: ({ row }) => <div>{row.getValue("email")}</div>,
    },
    {
      accessorKey: "role",
      header: "角色",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("role")}</div>
      ),
    },
    {
      accessorKey: "status",
      header: "状态",
      cell: ({ row }) => (
        <div className={`capitalize ${
          row.getValue("status") === "Active" ? "text-green-600" : "text-red-600"
        }`}>
          {row.getValue("status")}
        </div>
      ),
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const user = row.original

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">打开菜单</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>操作</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => handleEditUser(user, true)}
                className="cursor-pointer"
              >
                <Eye className="mr-2 h-4 w-4" />
                查看
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleEditUser(user, false)}
                className="cursor-pointer"
              >
                <Pen className="mr-2 h-4 w-4" />
                编辑
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => {
                  setUserToDelete(user)
                  setIsDeleteDialogOpen(true)
                }}
                className="cursor-pointer text-red-600 focus:text-red-600"
              >
                <Trash className="mr-2 h-4 w-4" />
                删除
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]

  const table = useReactTable({
    data: users,
    columns,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  })

  return (
    <div className="w-full">
      <div className="flex items-center justify-between py-4">
        <div className="flex items-center gap-2">
          <Input
            placeholder="按名字过滤..."
            value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("name")?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
          <Dialog>
            <DialogTrigger asChild>
              <Button 
                onClick={() => {
                  setEditingUser(null)
                  setIsViewMode(false)
                  resetForm()
                }}
              >
                添加用户
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>
                  {isViewMode ? '查看用户' : (editingUser ? '编辑用户' : '添加用户')}
                </DialogTitle>
              </DialogHeader>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>姓名</FormLabel>
                        <FormControl>
                          <Input 
                            {...field} 
                            disabled={isViewMode}
                            placeholder="请输入姓名" 
                            autoComplete="name"
                            autoFocus
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>邮箱</FormLabel>
                        <FormControl>
                          <Input 
                            {...field} 
                            disabled={isViewMode}
                            placeholder="请输入邮箱" 
                            type="email"
                            autoComplete="email"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="role"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>角色</FormLabel>
                          <Select
                            disabled={isViewMode}
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            value={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="选择角色" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="Admin">管理员</SelectItem>
                              <SelectItem value="User">普通用户</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="status"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>状态</FormLabel>
                          <Select
                            disabled={isViewMode}
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            value={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="选择状态" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="Active">激活</SelectItem>
                              <SelectItem value="Inactive">未激活</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  {!isViewMode && (
                    <DialogFooter className="gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => {
                          setEditingUser(null)
                          form.reset()
                        }}
                      >
                        取消
                      </Button>
                      <Button 
                        type="submit"
                        disabled={!form.formState.isDirty || form.formState.isSubmitting}
                      >
                        {form.formState.isSubmitting ? "保存中..." : "保存"}
                      </Button>
                    </DialogFooter>
                  )}
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              显示列 <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup: any) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header: any) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row: Row<User>) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell: any) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  未找到结果
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-between space-x-2 py-4">
        <div className="text-sm text-muted-foreground">
          显示第 {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1} 到{" "}
          {Math.min(
            (table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize,
            table.getFilteredRowModel().rows.length
          )}{" "}
          条，共 {table.getFilteredRowModel().rows.length} 条
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            上一页
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            下一页
          </Button>
        </div>
      </div>

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>确认删除</AlertDialogTitle>
            <AlertDialogDescription>
              确定要删除用户 {userToDelete?.name} 吗？此操作无法撤销。
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>取消</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => userToDelete?.id && deleteUser(userToDelete.id)}
            >
              删除
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <Toaster />
    </div>
  )
} 
