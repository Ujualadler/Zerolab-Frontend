import { ImageResponse } from "next/og"

export const runtime = 'edge'
export const size = {
    width:32,
    height:32
}

export const ContentType = 'image/png'


export default function icon(){
     return new ImageResponse(
        <div>
            <img src="/images/loader.png"/>
        </div>
     ),{...size}
}