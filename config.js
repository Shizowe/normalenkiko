// JSONBin.io API Configuration
const API_CONFIG = {
    BIN_ID: '68f2b4ddae596e708f19864a',
    API_KEY: '$2a$10$VffiaD27D/bZOBvLOcVuwO9FBaW0pHCf1/zS7h9W1YKub5N4JFV3C',
    BASE_URL: 'https://api.jsonbin.io/v3/b/68f2b4ddae596e708f19864a',

    get endpoints() {
        return {
            latest: `${this.BASE_URL}${this.BIN_ID}/latest`,
            update: `${this.BASE_URL}${this.BIN_ID}`,
        };
    },

    get headers() {
        return {
            'Content-Type': 'application/json',
            'X-Master-Key': '$2a$10$VffiaD27D/bZOBvLOcVuwO9FBaW0pHCf1/zS7h9W1YKub5N4JFV3C',
            'X-Access-Key': '$2a$10$rdumoM6MRm5Sob8JGmezAOwdzRyidjZukZ8ERNSa6qZBHwnLwnovq',
        };
    },
};

// Export for browser or Node
if (typeof module !== 'undefined' && module.exports) {
    module.exports = API_CONFIG;
} else {
    window.API_CONFIG = API_CONFIG;
}

