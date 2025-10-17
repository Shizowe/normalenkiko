// JSONBin.io API Configuration
const API_CONFIG = {
    BIN_ID: '68ec37b9ae596e708f107d83',
    API_KEY: '$2a$10$MXJv3C4DwK3S.j4fM/qXkO4PNTtu/tvTNzTaTXPbLSNdxwBJ82oam',
    BASE_URL: 'https://api.jsonbin.io/v3/b/',

    get endpoints() {
        return {
            latest: `${this.BASE_URL}${this.BIN_ID}/latest`,
            update: `${this.BASE_URL}${this.BIN_ID}`,
        };
    },

    get headers() {
        return {
            'Content-Type': 'application/json',
            'X-Master-Key': this.API_KEY,
            'X-Access-Key': '68ec347f43b1c97be964c4be',
        };
    },
};

// Export for browser or Node
if (typeof module !== 'undefined' && module.exports) {
    module.exports = API_CONFIG;
} else {
    window.API_CONFIG = API_CONFIG;
}

