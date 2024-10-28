import HomeListItem from './HomeListItem';

export default function HomeList() {
  return (
    <div className="flex flex-col gap-[16px] overflow-hidden">
      <div className="grid grid-cols-6 text-xs text-content-primary/40 font-bold">
        <p className="col-span-2">NOME</p>
        <p>TELEFONE</p>
        <p className="col-span-2">EMAIL</p>
      </div>
      <div className="flex flex-col overflow-auto hide-scrollbar">
        <HomeListItem />
        <HomeListItem />
        <HomeListItem />
        <HomeListItem />
        <HomeListItem />
        <HomeListItem />
        <HomeListItem />
      </div>
    </div>
  );
}
