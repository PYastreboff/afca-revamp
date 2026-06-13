import { membershipFy27Fees } from "@/lib/apply-for-membership";

export function MembershipFeeTable() {
  return (
    <div className="overflow-x-auto rounded-2xl border border-afca-navy/10">
      <table className="w-full min-w-[36rem] text-left text-sm">
        <thead className="bg-afca-cream text-afca-navy">
          <tr>
            <th scope="col" className="px-4 py-3 font-semibold">
              Member type
            </th>
            <th scope="col" className="px-4 py-3 font-semibold">
              Application period
            </th>
            <th scope="col" className="px-4 py-3 font-semibold">
              Application fee
            </th>
            <th scope="col" className="px-4 py-3 font-semibold">
              Total payable (incl. GST)
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-afca-navy/8 bg-white text-afca-gray">
          {membershipFy27Fees.licensees.map((row, index) => (
            <tr key={row.period}>
              {index === 0 && (
                <th
                  scope="rowgroup"
                  rowSpan={membershipFy27Fees.licensees.length}
                  className="px-4 py-3 align-top font-semibold text-afca-navy border-r border-afca-navy/8"
                >
                  Licensees
                  <span className="mt-1 block text-xs font-normal text-afca-muted">
                    Includes application fee and base levy
                  </span>
                </th>
              )}
              <td className="px-4 py-3 whitespace-nowrap">{row.period}</td>
              <td className="px-4 py-3 whitespace-nowrap">{row.applicationFee}</td>
              <td className="px-4 py-3 whitespace-nowrap font-medium text-afca-navy">
                {row.totalPayable}
              </td>
            </tr>
          ))}
          <tr>
            <th scope="row" className="px-4 py-3 font-semibold text-afca-navy">
              Credit representatives
            </th>
            <td className="px-4 py-3 whitespace-nowrap">
              {membershipFy27Fees.creditRepresentatives.period}
            </td>
            <td className="px-4 py-3 whitespace-nowrap">
              {membershipFy27Fees.creditRepresentatives.applicationFee}
            </td>
            <td className="px-4 py-3 whitespace-nowrap font-medium text-afca-navy">
              {membershipFy27Fees.creditRepresentatives.totalPayable}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
