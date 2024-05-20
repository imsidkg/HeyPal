"use client"
export const maxDuration = 60; 
import Button from '@/components/ui/Button'
import { signOut } from 'next-auth/react'

export default function Home() {
  return <button onClick={() => signOut()}>Sign out</button>
}