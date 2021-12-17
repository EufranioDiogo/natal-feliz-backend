const DB_PROD_URL = 'mongodb://natal_feliz:natal_feliz_a@cluster0-shard-00-00.ieqvc.mongodb.net:27017,cluster0-shard-00-01.ieqvc.mongodb.net:27017,cluster0-shard-00-02.ieqvc.mongodb.net:27017/natal_feliz?ssl=true&replicaSet=atlas-wnp7is-shard-0&authSource=admin&retryWrites=true&w=majority'
const DB_DEV_URL = 'mongodb://localhost:27017/natal_feliz'

module.exports = { DB_PROD_URL, DB_DEV_URL }
// mongodb+srv://consumer:consumer_a@cluster0.dfuhn.mongodb.net/natal_feliz?retryWrites=true&w=majority