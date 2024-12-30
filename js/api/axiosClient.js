import axios from 'axios'

const axiosClient = axios.create({
  baseURL: 'https://js-post-api.herokuapp.com/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

// Thêm một bộ đón chặn request
axiosClient.interceptors.request.use(
  function (config) {
    //Attach token to request if exists
    const accessToken = localStorage.getItem('access_token')
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`
    }

    return config
  },
  function (error) {
    // Làm gì đó với lỗi request
    return Promise.reject(error)
  },
)

// Thêm một bộ đón chặn response
axiosClient.interceptors.response.use(
  function (response) {
    return response.data
  },
  function (error) {
    console.log('axiosClient - response error', error.response)
    if (!error.response) throw new Error('Network error. Please try agian later.')

    if (error.response.status === 401) {
      window.location.assign('/login.html')
      return
    }

    return Promise.reject(error)
  },
)

export default axiosClient
