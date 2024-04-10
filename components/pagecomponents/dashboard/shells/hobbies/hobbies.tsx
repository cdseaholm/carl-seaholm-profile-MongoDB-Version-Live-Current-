import { Hobby } from "@/types/hobby";

import Bjj from "@/components/pagecomponents/dashboard/shells/hobbies/bjj/entries";
import Guitar from "./guitar/entries";
import Piano from "./piano/entries";
import Fitness from "./fitness/entries";
import Coding from "./coding/entries";
import Reading from "./reading/entries";
import Writing from "./writing/entries";
import Meditation from "./meditation/entries";
import Garden from "./gardening/entries";
import Learning from "./learning/entries";

    
    const HobbiesArray = [
    
    {
        title: 'Brazilian Jiu Jitsu',
        date: Bjj().map((item) => item.date),
        descriptions: Bjj().map((item) => item.description),
        minutesXsession: Bjj().map((item) => item.time),
        category: ['Martial Arts', 'Fitness', 'Personal Growth'],
        goal: ['Get brown belt', 'Get black belt', "Don't give up"]
    },
    {
        title: 'Guitar',
        date: Guitar().map((item) => item.date),
        descriptions: Guitar().map((item) => item.description),
        minutesXsession: Guitar().map((item) => item.time),
        category: ['Music', 'Personal Growth'],
        goal: ['Play in a band', 'Play at a party', "Don't give up"]
    },
    {
        title: 'Piano',
        date: Piano().map((item) => item.date),
        descriptions: Piano().map((item) => item.description),
        minutesXsession: Piano().map((item) => item.time),
        category: ['Music', 'Personal Growth'],
        goal: ['Play in a band', 'Play at a party', "Don't give up"]
    },
    {
        title: 'Working Out',
        date: Fitness().map((item) => item.date),
        descriptions: Fitness().map((item) => item.description),
        minutesXsession: Fitness().map((item) => item.time),
        category: ['Fitness', 'Personal Growth'],
        goal: ['Get brown belt', 'Get black belt', "Don't give up"]
    },
    {
        title: 'Coding',
        date: Coding().map((item) => item.date),
        descriptions: Coding().map((item) => item.description),

        minutesXsession: Coding().map((item) => item.time),
        category: ['Technology', 'Personal Growth'],
        goal: ['Get brown belt', 'Get black belt', "Don't give up"]
    },
    {
        title: 'Reading',
        date: Reading().map((item) => item.date),
        descriptions: Reading().map((item) => item.description),
        minutesXsession: Reading().map((item) => item.time),
        category: ['Personal Growth'],
        goal: ['Get brown belt', 'Get black belt', "Don't give up"],
    },
    {
        title: 'Writing',
        date: Writing().map((item) => item.date),
        descriptions: Writing().map((item) => item.description),
        minutesXsession: Writing().map((item) => item.time),
        category: ['Personal Growth'],
        goal: ['Get brown belt', 'Get black belt', "Don't give up"]
    },
    {
        title: 'Meditation',
        date: Meditation().map((item) => item.date),
        descriptions: Meditation().map((item) => item.description),
        minutesXsession: Meditation().map((item) => item.time),
        category: ['Personal Growth'],
        goal: ['Get brown belt', 'Get black belt', "Don't give up"]
    },
    {
        title: 'Basic Gardening',
        date: Garden().map((item) => item.date),
        descriptions: Garden().map((item) => item.description),
        minutesXsession: Garden().map((item) => item.time),
        category: ['Personal Growth'],
        goal: ['Get brown belt', 'Get black belt', "Don't give up"]
    },
    {
        title: 'Learning',
        date: Learning().map((item) => item.date),
        descriptions: Learning().map((item) => item.description),
        minutesXsession: Learning().map((item) => item.time),
        category: ['Personal Growth'],
        goal: ['Get brown belt', 'Get black belt', "Don't give up"]
    }
    ];

export default HobbiesArray; 