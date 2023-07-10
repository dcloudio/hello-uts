const ERR_RE = /expected:<(.*)> but was:<(.*)>/

let result;

beforeAll(async () => {
    await program.reLaunch('/pages/test/index')
    page = await program.currentPage()
    await page.waitFor(3000);
    const data = await page.data();
    result = data['result']
})

function getApiFailed(describe, api) {
    const failed = result[describe]?.failed?.find(item => {
        return item.split(':')[0] === api
    })
    return failed
}

describes.forEach(d => {
    d?.describe && describe(d.describe, () => {
        d?.tests && d.tests.forEach(api => {
            it(api, ()=>{
                const failed = getApiFailed(d.describe, api)
                if (failed) {
                    const parts = failed.split('\n')
                    const matches = parts[1].match(ERR_RE)
                    if (matches?.length) {
                        expect(matches[2]).toEqual(matches[1])
                    } else {
                        expect(parts[1]).toEqual('')
                    }
                }
            })
        })
   })
})
