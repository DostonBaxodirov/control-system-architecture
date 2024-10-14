import axios from 'axios';

// const cookies = new Cookies();
// Axios instance
export const http = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: {}
});

// for multiple requests
let isRefreshing = false;
let failedQueue: any = [];

const processQueue = (error: any, token = null) => {
  failedQueue.forEach((prom: any) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

http.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    if (error.response.status === 500) {
      alert('An error is occurred, please contact to administrator');
      throw error;
    }

    // eslint-disable-next-line no-underscore-dangle
    if (error.response.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        try {
          const token = await new Promise((resolve, reject) => {
            failedQueue.push({ resolve, reject });
          });

          originalRequest.headers.Authorization = `Bearer ${token}`;
          return await axios(originalRequest);
        } catch (err) {
          return await Promise.reject(err);
        }
      }

      // eslint-disable-next-line no-underscore-dangle
      originalRequest._retry = true;
      
      isRefreshing = true;

      const refresh_token = localStorage.getItem('refresh_token');

      return new Promise((resolve, reject) => {
        axios
          .post(
            `${process.env.NEXT_PUBLIC_BASE_URL}/user/token/refresh`,
            {
              refresh: localStorage.getItem('refresh_token')
            },
            {
              headers: {
                Authorization: `Bearer ${refresh_token}`
              }
            }
          )
          .then(({ data }) => {
            localStorage.setItem('access_token', data?.access);

            axios.defaults.headers.common.Authorization = `Bearer ${data.access}`;
            originalRequest.headers.Authorization = `Bearer ${data.access}`;

            processQueue(null, data.access);
            resolve(axios(originalRequest));
          })
          .catch(err => {
            if (error.response.data.message === 'Unauthenticated.') {
              alert('Your activation time has expired, please log in again');
            }
            processQueue(err, null);
            reject(err);
          })
          .finally(() => {
            isRefreshing = false;
          });
      });
    }

    return Promise.reject(error);
  }
);

// // Add a request interceptor
http.interceptors.request.use(
  (config: any) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('access_token')}`;
    return config;
  },
  async error => {
    if (error.response.data.code === 500) {
      alert('An error is occurred, please contact to administrator');
      return;
    }

    if (error.response.data.message === 'Unauthenticated.') {
      try {
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_BASE_URL}/user/token/refresh`,
          { refresh: localStorage.getItem('refresh_token') },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('refresh_token')}`
            }
          }
        );

        if (res.data) {
          localStorage.setItem('access_token', res?.data?.access);
        }
      } catch (err) {
        if (error.response.data.message === 'Unauthenticated.') {
          alert('Your activation time has expired, please log in again!');
        }
      }
    }
    // eslint-disable-next-line consistent-return
    return Promise.reject(error);
  }
);
