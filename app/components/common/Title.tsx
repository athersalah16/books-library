type Props = {
  title: string;
  description: string;
};
function Title({ title, description }: Props) {
  return (
         <div className="gap-2 flex flex-col">
        <h1 className="text-primary text-3xl font-bold">{title}</h1>
        <p>{description}</p>
      </div>
  )
}

export default Title
