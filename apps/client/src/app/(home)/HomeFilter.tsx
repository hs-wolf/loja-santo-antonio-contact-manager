'use client';

import { useRef } from 'react';

export enum FilterList {
  A = 'A',
  B = 'B',
  C = 'C',
  D = 'D',
  E = 'E',
  F = 'F',
  G = 'G',
  H = 'H',
  I = 'I',
  J = 'J',
  K = 'K',
  L = 'L',
  M = 'M',
  N = 'N',
  O = 'O',
  P = 'P',
  Q = 'Q',
  R = 'R',
  S = 'S',
  T = 'T',
  U = 'U',
  V = 'V',
  W = 'W',
  X = 'X',
  Y = 'Y',
  Z = 'Z',
}

export default function HomeFilter({
  value,
  select,
}: {
  value?: FilterList;
  select: (value: FilterList) => void;
}) {
  const listRef = useRef<HTMLUListElement>(null);

  function selectFilter(index: number) {
    if (listRef.current) {
      const item = listRef.current.children[index];
      if (item) {
        item.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        });
      }
      select(Object.values(FilterList)[index]);
    }
  }

  return (
    <ul
      ref={listRef}
      className="flex flex-col justify-between gap-3 w-[58px] py-[16px] bg-accent-brand rounded-[20px] overflow-auto hide-scrollbar snap-y snap-mandatory"
    >
      {Object.values(FilterList).map((item, index) => (
        <li
          key={item}
          className={`flex flex-col justify-center snap-center font-bold ${
            value === item
              ? 'text-content-inverse text-2xl'
              : 'text-content-muted text-sm'
          }`}
        >
          <button onClick={() => selectFilter(index)}>{item}</button>
        </li>
      ))}
    </ul>
  );
}
