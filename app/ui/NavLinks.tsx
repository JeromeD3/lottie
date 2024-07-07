'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { fetchRoutes } from '@/hook/useGetRouter';
import { useEffect, useState } from 'react';

export default function NavLinks() {
  const pathname = usePathname();
  const [links, setLinks] = useState([])

  useEffect(() => {
    fetchRoutes().then(data => {
      const res = data.directories.map((link: any) => {
        return {
          name: link,
          href: `/${link}`,
        }
      })
      setLinks(res)
    })
  }, [])



  return (
    <>
      {links.map((link: any) => {
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              'flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3',
              {
                'bg-sky-100 text-blue-600': pathname === link.href,
              },
            )}
          >
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
