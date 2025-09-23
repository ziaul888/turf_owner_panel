'use client'
import PageTopSection from './_components/PageTopSection'
import React, { useState } from 'react'
import { Card } from '@/components/ui/card'
import { SectionCards } from '../default/_components/section-cards'
import { DataTable } from '../default/_components/data-table'
import data from '../default/_components/data.json'
import DashBoardCard from '../default/_components/DashBoardCard'
import { TrendingUp, TrendingDown } from "lucide-react";


const page = () => {
    const [openAddBookingModal, setOpenAddBookingModal] = useState(false)
    const [openEditBookingModal, setOpenEditBookingModal] = useState(false)
  return (
   <div>
    <Card className='@container/card shadow-xs px-4 sm:px-8' >
      <PageTopSection setOpenAddBookingModal={setOpenAddBookingModal} setOpenEditBookingModal={setOpenEditBookingModal}/>
     <div className="@container/main bg-gray-100 p-4 rounded-lg flex flex-col gap-4 md:gap-6">
     <div className="*:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      <DashBoardCard className="from-primary-foreground text-primary" title="Total Booking" value="1,234" percentage="-20%" subtitle="Acquisition needs attention" icon={<TrendingDown className="size-4" />} />
      <DashBoardCard className="from-primary-foreground text-accent" title="Booking Complate" value="1,234" percentage="12.5%" subtitle="Trending up this month" icon={<TrendingUp className="size-4" />} />
      <DashBoardCard className="from-destructive/5 text-destructive/70" title="Pending Booking" value="1,234" percentage="12.5%" subtitle="Trending up this month" icon={<TrendingUp className="size-4" />} />
      <DashBoardCard className="from-primary-foreground text-primary" title="Total Cancel" value="1,234" percentage="12.5%" subtitle="Trending up this month" icon={<TrendingUp className="size-4" />} />
    </div>
      </div>
      <DataTable data={data} />
    </Card>
   </div>
  )
}

export default page