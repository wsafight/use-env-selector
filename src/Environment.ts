import { EnvironmentManager } from "./EnvironmentManager"
import { setValue } from "./utils"

export interface EnvVariable {
    name: string
    label?: string
    value: any
}

interface EnvironmentParams {
    name: string
    manager: EnvironmentManager
    variables: EnvVariable[]
}

class Environment {
    readonly name: string
    readonly manager: EnvironmentManager
    variables: EnvVariable[]
    state: Record<string, any> = {}
    constructor({ name, manager, variables }: EnvironmentParams) {
        this.name = name
        this.manager = manager
        this.variables = variables
        this.generateStateFromVariables()
    }

    generateStateFromVariables = () => {
        this.state = {}
        for (const variable of this.variables) {
            setValue(variable.name, variable.value, this.state)
        }
    }

    set = ({ name, value, label }: EnvVariable) => {
        if (!name) {
            return
        }
        const variable = this.variables.find(item => item.name === name)
        if (variable) {
            variable.value = value
        } else {
            this.variables.push({
                name,
                value,
                label
            })
        }
        setValue(name, value, this.state)
        this.manager.dispatchSubscribe()
    }

    getState = () => this.state
}

export default Environment