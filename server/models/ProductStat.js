import mongoose from "mongoose";
//need validation
const ProductStatSchema = new mongoose.Schema(
    {
        productId: String,
        yearlySalesTotal: Number,
        yearlyTotalSoldUnits: String,
        year: String,
        monthlyData: [{
            month: String,
            totalSales: Number,
            totalUnits: Number,
        }],
        dailyData: [{
            data: String,
            totalSales: Number,
            totalUnits: Number,
        }]
    },
    {
        timestamps: true
    }
)

const ProductStat = mongoose.model("ProductStat", ProductStatSchema);
export default ProductStat;