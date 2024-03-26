import React from 'react'
import { Label } from '../ui/shad/label'
import { Input } from '../ui/shad/input'

interface TurbulenceInputProps {
  handleTurbulence: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const TurbulenceInput: React.FC<TurbulenceInputProps> = ({
  handleTurbulence
}) => {
  return (
    <div className='flex flex-col items-center gap-y-2'>
      <Label className='text-black-400'>Turbulence</Label>
      <Input
        className='w-[90px] placeholder:text-center bg-primaryInput'
        onChange={handleTurbulence}
        type='text'
        id='turbulence'
        placeholder='1.0'
      />
    </div>
  )
}
