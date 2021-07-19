export const groupBy = (arr: Array<any>, group: number) => {
    let rt: Array<Array<any>> = [];
    let build: Array<any> = [];

    arr.forEach((elem: any) => {
        if (build.length === group) {
            rt.push(build);
            build = [];
        }
        else
            build.push(elem);
    });

    if (build.length !== 0) {
        for (let i: number = build.length; i < group; ++i)
            build.push(null);
        rt.push(build);
    }

    return rt;
}
