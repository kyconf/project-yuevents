interface Props{
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void
}

export default function ReviewSubmitButton({onClick}:Props){
    return(
        <button
  onClick={onClick}
  type="submit"
  className="
    mt-1
    w-20
    py-1
    font-semibold
    text-white
    bg-blue-500
    shadow-lg
    hover:bg-blue-700
    transform hover:scale-105
    transition
    duration-300
    focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2
    rounded-xl
  "
>
  Save
</button>
    );
}