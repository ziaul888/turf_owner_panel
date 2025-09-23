import React from 'react'
import { PageTitle } from './PageTitle'
import { Button } from '@/components/ui/button'
import {  Plus } from 'lucide-react'

const PageTopSection = ({setOpenAddBookingModal, setOpenEditBookingModal}: {setOpenAddBookingModal: (open: boolean) => void, setOpenEditBookingModal: (open: boolean) => void}) => {
  return (
    <div className='flex sm:flex-row flex-col justify-between items-center sm:gap-4 gap-2'>
        <PageTitle />
        <div className='flex gap-2'>
            <Button variant="default" size="lg" onClick={() => setOpenAddBookingModal(true)} >
                <Plus className="size-4" />
               Import
            </Button>
            <Button variant="default" size="lg" onClick={() => setOpenEditBookingModal(true)}>
                <Plus className="size-4" />
                Add Booking
            </Button>
        </div>
    </div>
  )
}

export default PageTopSection