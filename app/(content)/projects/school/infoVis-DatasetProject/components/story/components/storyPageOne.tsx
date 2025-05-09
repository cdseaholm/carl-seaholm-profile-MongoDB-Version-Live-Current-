'use client'

import StoryPageWrapper from "../../components/templates/storyPageWrapper"
import TextWrapper from "../../components/templates/textWrapper"


export default function StoryPageOne({ userName, textClass }: { userName: string, textClass: string }) {

    return (
        <StoryPageWrapper>
            <TextWrapper page={1}>
                <p className={textClass}>
                    {`In today's lesson, ${userName} on your path to becoming a premier sommelier (som-moll-ee-ay), we aim to help better prepare you for questions regarding Wine Quality, what makes a good wine, and what folks can look for when choosing a good wine. Tomorrow, we will go into what each of these attributes are, how the process dictates how much gets put into them. But for today, we just want to see how these different attributes affect the wines.`}
                </p>
                <p className={textClass}>
                    {`To do so, we will look at some graphs and see if we can figure out by looking at a large data sample, what we think affects the quality of the wines we have listed.`}
                </p>
                <p className={textClass}>
                    {`We shall begin with Red wines. In these next few session slides, we aim to use a breakdown of thousands of wine. Analyzing how the different chemicals and ingredients affect wines and the outcomes.`}
                </p>
            </TextWrapper>
        </StoryPageWrapper>
    )
}