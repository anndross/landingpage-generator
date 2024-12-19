import { ItemType } from '@/components/Sections'
import richTextJson from '../vtex-io-components/rich-text.json'
import imageJson from '../vtex-io-components/image.json'

export function updateFinalComponent(type: ItemType['type'], id: string, content: string, code: Object) {
    return updateVtexIoComponents(type, id, content, code)
}

export function updateVtexIoComponents(type: ItemType['type'], id: string, content: string, code: Object) {

    function richText() {
        if(code) richTextJson['rich-text#']['props']['text'] = content

        return richTextJson
    }

    function image() {
        if(code) imageJson['image#']['props']['src'] = content

        return imageJson
    }

    const components = {
        text: richText,
        image: image
    }

    const updateFn = components[type]

    return updateFn()
}