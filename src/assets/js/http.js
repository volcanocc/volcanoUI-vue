const apiMethods = {
    methods: {
        apiPost(url, data) {
            return new Promise((resolve, reject) => {
                axios.post(url, data, {
                    headers: {
                    }
                }).then((response) => {
                    resolve(response.data)
                    console.log(response.data)
                }).catch((response) => {
                    reject(response.data)
                    this.$dialog.alert({mes: '请求超时，请重试...'})
                })
            })
        }
    }
}

export default apiMethods
