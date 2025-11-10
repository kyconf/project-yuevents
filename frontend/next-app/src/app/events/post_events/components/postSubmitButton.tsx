interface Props{
    onClick: () => void
}







export default function SubmitButton({onClick}:Props){
    return(
        <button
  onClick={onClick}
  type="submit"
  className="
  mt-3
    w-70
    py-3
    rounded-xl
    font-semibold
    text-white
    bg-linear-to-r from-blue-500 to-black
    shadow-lg
    hover:from-black hover:to-blue-500
    transform hover:scale-105
    transition
    duration-300
    focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2
  "
>
  Save Settings
</button>
    );
}