import { fakerPL as faker } from '@faker-js/faker'

class DateRangeFaker {
  generate(count: number) {
    const results = []

    for (let i = 0; i < count; i++) {
      const from = faker.date.past({ years: 2 })
      const to = faker.date.soon({ days: 20, refDate: from })

      results.push({
        from,
        to,
      })
    }

    return results
  }
}

export default DateRangeFaker
