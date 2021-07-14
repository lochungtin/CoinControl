export interface PromptTextMap {
    [index: number]: string,
}

export interface CategoryType {
    color: string,
    icon: string,
    key: string,
    name: string,
}

export interface NumpadBtnProps {
    icon: string,
    isOp: boolean,
    onPress: () => void,
}
