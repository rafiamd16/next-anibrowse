'use client'

import { Button } from '@/components/ui/button'
import { useState } from 'react'
import Youtube from 'react-youtube'

const VideoPlayer = ({ youtubeId }: { youtubeId: string }) => {
  const [show, setShow] = useState(true)

  const option = {
    width: '300',
    height: '250',
  }

  return (
    <div className="fixed right-4 bottom-2 rounded-xl">
      <Youtube
        videoId={youtubeId}
        onReady={(e) => e.target.pauseVideo()}
        opts={option}
        className={show ? 'block' : 'hidden'}
      />
      {show ? (
        <Button
          variant="secondary"
          type="button"
          size="sm"
          onClick={() => setShow(false)}
          className="absolute -top-8 right-0 animate-pulse cursor-pointer text-foreground"
        >
          Hide
        </Button>
      ) : (
        <Button
          variant="outline"
          type="button"
          onClick={() => setShow(true)}
          className="absolute right-0 bottom-2 animate-bounce cursor-pointer text-foreground"
        >
          Show Video
        </Button>
      )}
    </div>
  )
}

export default VideoPlayer
