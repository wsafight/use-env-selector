import { useEffect, useReducer, useRef } from "react"
import Environment, { EnvVariable } from "./Environment"
import { defaultEqualFn } from "./utils"

type SubscribeCallback = () => void

type Selector<Selected> = (state: Record<string, any>) => Selected

export class EnvironmentManager {
    private use: string = ''
    private environments = new Map<string, Environment>()
    private listeners: Set<SubscribeCallback> = new Set()

    add = (id: string, name: string, variables: EnvVariable[]) => {
        this.environments.set(id, new Environment({ name, variables, manager: this }))
    }

    get = (id: string) => this.environments.get(id)

    current = () => this.get(this.use)!

    setCurrent = (id: string) => {
        if (!this.environments.has(id)) {
            return
        }
        this.use = id
        this.dispatchSubscribe()
    }

    private subscribe = (callback: SubscribeCallback) => {
        this.listeners.add(callback)
        return () => this.unsubscribe(callback)
    }

    private unsubscribe = (callback: SubscribeCallback) => {
        this.listeners.delete(callback)
    }

    // TODO optimizing
    dispatchSubscribe = () => {
        this.listeners.forEach(listener => listener())
    }

    useSelector = <Selected>(selector: Selector<Selected>, equalityFn = defaultEqualFn) => {
        const state = this.current().getState()
        const selectedState = selector(state)
        const lastSelectedState = useRef<Selected>(selectedState)
 
        const [, forceRender] = useReducer(count => count + 1, 0)

        const checkThenUpdate = () => {
            const state = this.current().getState()
            const newSelectedState = selector(state)
            if (equalityFn(newSelectedState, lastSelectedState.current)) {
                return
            }
            lastSelectedState.current = newSelectedState
            forceRender()
        }

        useEffect(() => {
            return this.subscribe(checkThenUpdate)
        }, [])

        return selectedState
    }
}

const environmentManager = new EnvironmentManager()

export default environmentManager