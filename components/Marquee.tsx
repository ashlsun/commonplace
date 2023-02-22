
import dayjs from 'dayjs';
import { useState } from 'react';

export default function Marquee () {

    const [showTitle, setShowTitle] = useState(false)

    return (
        <>
        <a href="/">
        <div className="flex mix-blend-color-burn select-none items-end">
            
                <img src="/toppansun.png" 
                    className="cursor-pointer h-[30px] w-auto hover:rotate-12 transition duration-200"
                    onMouseEnter={() => setShowTitle(!showTitle)}
                    onMouseLeave={() => setShowTitle(!showTitle)}></img>
            
            
            <span className={"font-bold transition duration-200 px-2 " + (showTitle ? "" : " opacity-0")}>
            <div className="relative hidden md:flex overflow-x-hidden max-w-[640px]">
                <div className="animate-marquee whitespace-nowrap">
                <span className="mx-16 px-2 rounded-full outline outline-1 outline-[#99411ba7]">
                        <span className="text-[#99281b92]">Common</span><span className="text-[#99411ba7]">place</span><span className="text-[#99581bdd]">.day!</span>
                    </span>

                    <span className="mx-16 font-normal not-italic text-gray-600">
                        Today is a {dayjs().format("dddd")}.
                    </span>
                    
                    <span className="mx-16 px-2 rounded-full outline outline-1 outline-[#82991b]">
                        <span className="text-[#99841b]">Common</span><span className="text-[#82991b]">place</span><span className="text-[#77991b]">.day!</span>
                    </span>

                    <span className="mx-16 font-normal not-italic text-gray-600">
                        The date is {dayjs().format("MMMM D, YYYY")}.
                    </span>

                    <span className="mx-16 px-2 rounded-full outline outline-1 outline-[#1b9956]">
                        <span className="text-[#1b9923]">Common</span><span className="text-[#1b9956]">place</span><span className="text-[#1b998e]">.day!</span>
                    </span>

                    <span className="mx-16 font-normal not-italic text-gray-600">
                        Breathe slowly.
                    </span>

                    <span className="mx-16 px-2 rounded-full outline outline-1 outline-[#1b5499]">
                        <span className="text-[#1b7199]">Common</span><span className="text-[#1b5499]">place</span><span className="text-[#1b4199dc]">.day!</span>
                    </span>

                    <span className="mx-16 font-normal not-italic text-gray-600">
                        It is {dayjs().format("h:mma")} on a {dayjs().format("dddd")}.
                    </span>

                    <span className="mx-16 px-2 rounded-full outline outline-1 outline-[#691b997b]">
                        <span className="text-[#411b997e]">Common</span><span className="text-[#691b997b]">place</span><span className="text-[#991b8c73]">.day!</span>
                    </span>

                    <span className="mx-16 font-normal not-italic text-gray-600">
                        Repeat after me: "I have time."
                    </span>

                    <span className="mx-16 px-2 rounded-full outline outline-1 outline-[#991b2e84]">
                        <span className="text-[#991b6979]">Common</span><span className="text-[#991b2e84]">place</span><span className="text-[#991b1b8d]">.day!</span>
                    </span>

                    <span className="mx-16 font-normal not-italic text-gray-600">
                        Remember that you are beautiful! (⊙‿⊙ ✿)
                    </span>
                </div>

                <div className="absolute top-0 animate-marquee2 whitespace-nowrap ">                                                        
                <span className="mx-16 px-2 rounded-full outline outline-1 outline-[#99411ba7]">
                        <span className="text-[#99281b92]">Common</span><span className="text-[#99411ba7]">place</span><span className="text-[#99581bdd]">.day!</span>
                    </span>

                    <span className="mx-16 font-normal not-italic text-gray-600">
                        Today is a {dayjs().format("dddd")}.
                    </span>
                    
                    <span className="mx-16 px-2 rounded-full outline outline-1 outline-[#82991b]">
                        <span className="text-[#99841b]">Common</span><span className="text-[#82991b]">place</span><span className="text-[#77991b]">.day!</span>
                    </span>

                    <span className="mx-16 font-normal not-italic text-gray-600">
                        The date is {dayjs().format("MMMM D, YYYY")}.
                    </span>

                    <span className="mx-16 px-2 rounded-full outline outline-1 outline-[#1b9956]">
                        <span className="text-[#1b9923]">Common</span><span className="text-[#1b9956]">place</span><span className="text-[#1b998e]">.day!</span>
                    </span>

                    <span className="mx-16 font-normal not-italic text-gray-600">
                        A reminder that you don't have to hold your breath.
                    </span>

                    <span className="mx-16 px-2 rounded-full outline outline-1 outline-[#1b5499]">
                        <span className="text-[#1b7199]">Common</span><span className="text-[#1b5499]">place</span><span className="text-[#1b4199dc]">.day!</span>
                    </span>

                    <span className="mx-16 font-normal not-italic text-gray-600">
                        It is {dayjs().format("h:mma")} on a {dayjs().format("dddd")}.
                    </span>

                    <span className="mx-16 px-2 rounded-full outline outline-1 outline-[#691b997b]">
                        <span className="text-[#411b997e]">Common</span><span className="text-[#691b997b]">place</span><span className="text-[#991b8c73]">.day!</span>
                    </span>

                    <span className="mx-16 font-normal not-italic text-gray-600">
                        So many things to be grateful for!
                    </span>

                    <span className="mx-16 px-2 rounded-full outline outline-1 outline-[#991b2e84]">
                        <span className="text-[#991b6979]">Common</span><span className="text-[#991b2e84]">place</span><span className="text-[#991b1b8d]">.day!</span>
                    </span>

                    <span className="mx-16 font-normal not-italic text-gray-600">
                        Love and be loved!
                    </span>
                </div>
                
            </div>

            </span>
        </div>
        </a>
        </>
    )
    
}
