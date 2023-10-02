export class ParseSource {
  execute(rawSourceComponent: string | null) {
    if (rawSourceComponent === null) {
      return null
    }
    else {
      const sourceParts = rawSourceComponent.split('!')
      return {
        nick: (sourceParts.length == 2) ? sourceParts[0] : null,
        host: (sourceParts.length == 2) ? sourceParts[1] : sourceParts[0]
      }
    }
  }
}
