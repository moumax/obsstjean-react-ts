import { Label } from '@/components/ui/shad/label'
import { Input } from '@/components/ui/shad/input'

interface BarlowSizeInputProps {
  handleBarlowSize: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const BarlowSizeInput: React.FC<BarlowSizeInputProps> = ({
  handleBarlowSize
}) => {
  return (
    <div className='flex flex-col items-center gap-y-2'>
      <Label className='text-black-400'>Barlow</Label>
      <Input
        className='w-[90px] placeholder:text-center bg-primaryInput'
        onChange={handleBarlowSize}
        type='text'
        id='barlow'
        placeholder='1.0'
      />
    </div>
  )
}
