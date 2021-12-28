import { Line } from 'vue-chartjs'

export default {
    extends: Line,
    name: "LineChart",
    props: ['data', 'options'],
    mounted() {
        this.renderChart({
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'Nowember', 'Desember'],
            datasets: [{
                label: 'Commits on GitHub',
                backgroundColor: '#f87979',
                data: [20, 12, 40, 29, 15, 42, 35, 80, 40, 20, 12, 11]
            }]
        }, { responsive: true, maintainAspectRatio: false })
    }
}