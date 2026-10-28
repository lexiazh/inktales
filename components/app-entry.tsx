'use client';

import {useEffect,useState} from 'react';
import {supabase} from '@/lib/supabase';
import {HomeEntry} from '@/components/home-entry';
import InkTales from '@/components/inktales';

export default function AppEntry(){
 const [entered,setEntered]=useState(false);
 const [checking,setChecking]=useState(true);
 const [username,setUsername]=useState('');

 useEffect(()=>{
  const {data:{subscription}}=supabase.auth.onAuthStateChange((_event,session)=>{
   setEntered(Boolean(session));
   setUsername(session?.user.user_metadata.username||session?.user.email?.split('@')[0]||'');
   setChecking(false);
  });
  supabase.auth.getSession().then(({data:{session}})=>{
   setEntered(Boolean(session));
   setUsername(session?.user.user_metadata.username||session?.user.email?.split('@')[0]||'');
   setChecking(false);
  });
  return()=>subscription.unsubscribe();
 },[]);

 if(checking)return null;
 return entered?<InkTales username={username}/>:<HomeEntry onGuest={()=>setEntered(true)}/>;
}
