"use client"

import { redirect } from "next/navigation";
import { useLoginUser } from "@/model/states/LoginUserState";

export default function Home() {

  const {user} = useLoginUser()

  if(user) {
    if(user.role === 'Admin') {
      // Navigate to Admin Home
      redirect('/admin')
    } else if (user.role === 'Member') {
      // Navigate to Member Home
      redirect('/member')
    }
  } else {
    // Navigate anonymous Home
    redirect('/anonymous')
  }
}
