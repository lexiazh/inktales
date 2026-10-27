'use client';

import {useState} from 'react';
import {ArrowRight,Eye,EyeOff} from 'lucide-react';

export function HomeEntry({onGuest}:{onGuest:()=>void}){
 const [mode,setMode]=useState<'in'|'up'>('in');
 const [showPassword,setShowPassword]=useState(false);
 const [message,setMessage]=useState('');
 return <section className="entry-page" aria-label="Welcome to InkTales">
  <picture className="entry-art-layer">
   <source media="(max-width:760px)" srcSet="/assets/landscape-scroll-clean.jpg"/>
   <img className="entry-art" src="/assets/landscape-scroll-background.png" alt="An ink-brush path winding into a misty mountain scroll"/>
  </picture>
  <img className="entry-traveler" src="/assets/landscape-traveler.png" alt="" aria-hidden="true"/>
  <div className="entry-copy">
   <span className="eyebrow">A MORE MEMORABLE WAY TO LEARN CHINESE</span>
   <h1>Every character<br/><em>holds a story.</em></h1>
   <p className="entry-chinese" lang="zh-CN">一笔一画，皆有故事</p>
   <p className="entry-description">Discover the pictures and stories behind Chinese characters.<br/>Build a meaningful connection with the language, one small<br className="desktop-break"/> moment at a time.</p>
  </div>
  <div className="entry-card">
   <i className="entry-corner top-left"/><i className="entry-corner top-right"/><i className="entry-corner bottom-left"/><i className="entry-corner bottom-right"/>
   <h2>Start your learning</h2>
   <div className="entry-tabs" aria-label="Account options">
    <button type="button" className={mode==='in'?'active':''} aria-pressed={mode==='in'} onClick={()=>{setMode('in');setMessage('');}}>Sign in</button>
    <button type="button" className={mode==='up'?'active':''} aria-pressed={mode==='up'} onClick={()=>{setMode('up');setMessage('');}}>Sign up</button>
   </div>
   <form onSubmit={event=>{event.preventDefault();event.currentTarget.reset();setMessage('Accounts are not available yet. You can continue learning as a guest; progress stays in this browser.');}}>
    {mode==='up'&&<><label htmlFor="entry-username">Username</label><input id="entry-username" type="text" autoComplete="username" placeholder="Choose a username" required/></>}
    <label htmlFor="entry-email">Email address</label>
    <input id="entry-email" type="email" autoComplete="email" placeholder="you@example.com" required/>
    <label htmlFor="entry-password">Password</label>
    <div className="entry-password"><input id="entry-password" type={showPassword?'text':'password'} autoComplete={mode==='in'?'current-password':'new-password'} placeholder="At least 6 characters" minLength={6} required/><button type="button" aria-label={showPassword?'Hide password':'Show password'} onClick={()=>setShowPassword(value=>!value)}>{showPassword?<Eye size={18}/>:<EyeOff size={18}/>}</button></div>
    <button className="entry-submit" type="submit">{mode==='in'?'Continue learning':'Create account'}<ArrowRight size={20}/></button>
   </form>
   {message&&<p className="entry-message" role="status">{message}</p>}
   <button className="entry-guest" type="button" onClick={onGuest}>Explore without an account <ArrowRight size={15}/></button>
  </div>
 </section>;
}
