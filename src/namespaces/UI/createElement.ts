export async function CreateElement(tag: string, props: any, ...children: any[]) {
    return { tag, props, children }
}