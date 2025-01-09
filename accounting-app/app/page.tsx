"use client"

import { redirect } from "next/navigation";
import { useLoginUser } from "@/model/states/LoginUserState";
import { useEffect } from "react";

export default function Home() {

  const {user} = useLoginUser()

  useEffect(() => {
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
  }, [user])
}
