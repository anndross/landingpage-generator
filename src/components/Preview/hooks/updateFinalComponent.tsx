import { ItemType } from '@/components/Sections'
import richTextJson from '../vtex-io-components/rich-text.json'
import imageJson from '../vtex-io-components/image.json'

export function updateFinalComponent(type: ItemType['type'], content: string, code: any) {
    return updateVtexIoComponents(type, content, code)
}

export function updateVtexIoComponents(type: ItemType['type'], content: string, code: any) {
    function richText() {
        if(code) richTextJson['rich-text#text']['props']['text'] = content

        console.log(richTextJson)
        return richTextJson
    }

    function image() {
        if(code) imageJson['image#image']['props']['src'] = content

        console.log(imageJson)
        return imageJson
    }

    const components = {
        text: richText,
        image: image
    }

    const updateFn = components[type]

    return updateFn()
}