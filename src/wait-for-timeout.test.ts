import * as wait_for_timeout from "@src/wait-for-timeout"
// @ponicode
describe("wait_for_timeout.waitForTimeout", () => {
    test("0", () => {
        let callFunction: any = () => {
            wait_for_timeout.waitForTimeout(0)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction: any = () => {
            wait_for_timeout.waitForTimeout(100)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction: any = () => {
            wait_for_timeout.waitForTimeout(-5.48)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction: any = () => {
            wait_for_timeout.waitForTimeout(-100)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction: any = () => {
            wait_for_timeout.waitForTimeout(1)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction: any = () => {
            wait_for_timeout.waitForTimeout(-Infinity)
        }
    
        expect(callFunction).not.toThrow()
    })
})
