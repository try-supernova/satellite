export async function createElement(tag: string, props: any, ...children: any[]) {
    return { tag, props, children }
}