import UserRepository from './UserRepository'
import ShowRepository from './ShowRepository'
import EpisodeRepository from './EpisodeRepository'

const repositories = {
    'user': UserRepository,
    'show': ShowRepository,
    'episode': EpisodeRepository
}

export default {
    get: name => repositories[name]
}