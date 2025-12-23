import { Loader2 } from 'lucide-react'

function Loader() {
  return (
    <div className='h-screen flex justify-center items-center animate-spin ' >
      <Loader2 className='size-10 md:size-20' />
    </div>
  )
}

export default Loader