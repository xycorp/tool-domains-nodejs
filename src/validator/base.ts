import chalk from 'chalk'
import { ValidationError } from './error'
import _ from 'lodash'
import { Config } from '../config'

export class BaseValidator {
  public name: string
  public errors?: ValidationError[]
  public errorCount = 0
  protected config: Config

  constructor(config: any, name: string) {
    this.name = name
    this.config = config
  }

  public toJSON () {
    return _.omit(this, ["config"])
  }

  public async validate() {
    if (this.errors) {
      this.errorCount += this.addErrors.length
    }
    return this.errorCount
  }

  public addError(action: string, error: any) {
    this.errors = this.errors || []
    this.errors.push(new ValidationError(action, error))
    console.error(chalk.red(`${action}: ${error}`))
  }

  public addErrors(errors: ValidationError[] | undefined) {
    if (errors) {
      this.errors = this.errors || []
      this.errors = this.errors.concat(errors)
    }
  }

}
