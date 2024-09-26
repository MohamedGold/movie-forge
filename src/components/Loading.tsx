import { FaSpinner } from 'react-icons/fa'
export default function Loading() {
  return (
    <div className="flex items-center gap-3 justify-center  ">
      <FaSpinner className="animate-spin" size={18}></FaSpinner>
      <span className="text-2xl">Loading...</span>
    </div>
  )
}
