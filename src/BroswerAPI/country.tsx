/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useState } from 'react'

const API_KEY = ''

const queryCountryByFuzzySearch = async (value: string) => {
  const url = `https://dev.virtualearth.net/REST/v1/Autosuggest?query=${value}&key=${API_KEY}`

  const res = await fetch(url)
  const json = await res.json()
  console.log(json)

  if (json.resourceSets.length > 0) {
    const results = json.resourceSets[0].resources[0].value
    const formattedResults = results
      .map((result: any) => {
        const { address } = result
        const country = address.countryRegion || ''
        const city = address.locality || ''
        if (country && city) {
          return `${country}, ${city}`
        }
        return null
      })
      .filter((item: string | null) => item !== null)
    console.log(formattedResults)

    // setSuggestions(formattedResults)
  }
}

const Country: React.FC = () => {
  const handler = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log('position', position)
          const latitude = position.coords.latitude
          const longitude = position.coords.longitude

          // 使用逆地理编码服务获取地址信息
          fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          )
            .then((response) => response.json())
            .then((data) => {
              const location = data.address.state // 获取省份信息
              console.log('当前用户所在省份: ', data)
            })
            .catch((error) => {
              console.error('获取位置信息失败: ' + error)
            })
        },
        (error) => {
          console.error('获取地理位置失败: ' + error.message)
        }
      )
    } else {
      console.error('浏览器不支持Geolocation API')
    }
  }

  const feezySearchHandler = async () => {
    const data = await queryCountryByFuzzySearch('chengdu')
    console.log(data)
  }
  return (
    <div>
      country
      <button onClick={handler}>get</button>
      <button onClick={feezySearchHandler}>feezy search</button>
    </div>
  )
}

const Country2: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [suggestions, setSuggestions] = useState<string[]>([])

  const handleInputChange = async (value: string) => {
    setSearchQuery(value)
    if (value.length > 2) {
      try {
        const response = await fetch(
          `https://dev.virtualearth.net/REST/v1/Autosuggest?query=${value}&key=${API_KEY}`
        )
        const data = await response.json()
        if (data.resourceSets.length > 0) {
          const results = data.resourceSets[0].resources[0].value
          const formattedResults = results
            .map((result: any) => {
              const { address } = result
              const country = address.countryRegion || ''
              const city = address.locality || ''
              if (
                country &&
                city &&
                city.toLowerCase().includes(value.toLowerCase())
              ) {
                return `${country}, ${city}`
              }
              return null
            })
            .filter((item: string | null) => item !== null)

          // 去重操作
          const uniqueResults = Array.from(new Set(formattedResults))
          // setSuggestions(uniqueResults)
        }
      } catch (error) {
        console.error('Error fetching suggestions:', error)
      }
    } else {
      setSuggestions([])
    }
  }

  return (
    <div>
      <input
        type='text'
        value={searchQuery}
        onChange={(e) => handleInputChange(e.target.value)}
        placeholder='Search location...'
      />
      <ul>
        {suggestions.map((suggestion, index) => (
          <li key={index}>{suggestion}</li>
        ))}
      </ul>
    </div>
  )
}

export default Country2

// export default Country
