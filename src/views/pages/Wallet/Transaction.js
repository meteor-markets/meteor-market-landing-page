import React from 'react';
import {
    Box,
    Typography,
    makeStyles,
    TableCell,
    TableContainer,
    TableHead,
    Table,
    TableBody,
    TableRow,
    withStyles,
  } from "@material-ui/core";



  const useStyles = makeStyles((theme) => ({
    headBox: {
      borderRadius: "9px",
      "& h3": {
        marginBottom: "8px",
      },
    },
    detailsBtns: {
      padding: "0px 5px ",
      border: "2px solid rgb(255 255 255 / 10%)",
      background: "rgb(255 255 255 / 20%)",
    },
    root: {
      backgroundColor: "transparent",
      width: "100%",
    },
    numberBox: {
      "& h4": {
        color: "#FF9142",
        marginBottom: "3px",
      },
    },
  }));
  
  const StyledTableRow = withStyles((theme) => ({
    root: {
      border: "none",
    },
  }))(TableRow);
  
  const tableData = [
    {
      id: 1,
      asset: "DAI",
      assetIconSrc: "../images/DAI-logo1.png",
      supplyApy: "5.47%",
      rewardAPR: "0.38%",
      wallet: "1.51M DAI",
      totalSupply: "$374.40M",
      totalBorrow: "$374.40M",
      borrowAPY: "0.38%",
      date:"4 jan 2024",
      time:"18:42 PM",
      action:"Deposit",
      status:"Pending",
      amount:"$398.47",
      dollerAmount:"0.0153  DAI",
      transactionHash:"#3817827381",
      transactionId:"283h976qwe9ry25r817gf31f4fk17f9g"
    },
    {
      id: 2,
      asset: "LUSD",
      assetIconSrc: "../images/LUSD-logo1.png",
      supplyApy: "3.56%",
      rewardAPR: "0.79%",
      wallet: "284K LUSD",
      totalSupply: "$283.09M",
      totalBorrow: "$283.09M",
      borrowAPY: "0.79%",
      date:"4 jan 2024",
      time:"18:42 PM",
      action:"Deposit",
      status:"Confirmed",
      amount:"$398.47",
      dollerAmount:"0.0153  DAI",
      transactionHash:"#3817827381",
      transactionId:"283h976qwe9ry25r817gf31f4fk17f9g"
    },
  ];

export default function Transaction() {
  const classes = useStyles();

  return (
    <Box>
          <TableContainer style={{ background: "#1C1C1C" }}>
          <Box p={3} pb={0}>
            <Typography variant="h3" className="textColorFormate">
            Transactions
            </Typography>
            <Typography variant="body1" style={{marginBottom:"10px"}}>
            List of deposit  & withdrawals done by Investor
            </Typography>
          </Box>
          <Table style={{ minWidth: "900px" }}>
            <TableHead>
              <TableRow className={`${classes.tablerow1} tableHead`}>
                <TableCell>Date</TableCell>
                <TableCell>Action</TableCell>
                <TableCell>Progress Status</TableCell>
                <TableCell>Crypto</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Transaction ID / Hash</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tableData &&
                tableData.map((data, index) => {
                  return (
                    <StyledTableRow>
                     
                      <TableCell>
                      <Typography variant="body1" className="textColorFormate">{data.date}</Typography>
                      {data.time}
                      </TableCell>
                      <TableCell>{data.action}</TableCell>
                      <TableCell>
                      {data.status==="Pending"?<Typography variant="body1" style={{color:"#FF9142"}}>{data.status}</Typography>:<Typography variant="body1" style={{color:"#00FFA3"}}>{data.status}</Typography>}
                      </TableCell>
                      <TableCell>
                        <Box display={"flex"} alignItems={"center"}>
                          <img
                            alt=""
                            style={{
                              width: "25px",
                              height: "25px",
                              borderRadius: "5px",
                              objectFit: "cover",
                              marginRight: "15px",
                            }}
                            width="100%"
                            src={data.assetIconSrc}
                          />
                          <span>{data.asset}</span>
                        </Box>
                      </TableCell>
                      <TableCell>
                      <Typography variant="body1" style={{color:"#00FFA3"}}>{data.amount}</Typography>
                      <span style={{color:"rgb(255 255 255 / 50%)"}}>{data.dollerAmount}</span>
                      </TableCell>
                      <TableCell>
                      <Typography variant="body1" style={{color:"rgb(255 255 255 / 50%)"}}>{data.transactionHash}</Typography>
                      {data.transactionId}
                      </TableCell>
                    </StyledTableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
    </Box>
  )
}
