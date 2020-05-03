import UserRepository from './UserRepository'
import ShowRepository from './ShowRepository'
import EpisodeRepository from './EpisodeRepository'
import VideoRepository from './VideoRepository'

const repositories = {
    'user': UserRepository,
    'show': ShowRepository,
    'episode': EpisodeRepository,
    'video': VideoRepository
}

export default {
    get: name => repositories[name]
}