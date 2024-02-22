import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell} from "@nextui-org/react";


export default function CustomTableManual( prop: any) {

    let manualPatterns = prop.manualPat;

  return (
    <Table aria-label="Example static collection table">
      <TableHeader>
        <TableColumn>NAME</TableColumn>
      </TableHeader>

      <TableBody>
          {manualPatterns.map((manPat: any) => {
            return(
                <TableRow key={manualPatterns.indexOf(manPat)}>
                <TableCell>{manPat}</TableCell>
                </TableRow>
            )
          })}
      </TableBody>
    </Table>
  );
}