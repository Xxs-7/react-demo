import React from "react";
// import LineIcon from "./line-icon.svg";
// export default function Block() {
//   return (
//     <div>
//       <div>Block 1</div>
//       <div>Block 2</div>
//     </div>
//   );
// }

const LineIcon = () => (
  <svg
    width="14"
    height="22"
    viewBox="0 0 14 22"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="inline align-middle "
  >
    <path
      d="M12.9407 10.9051L7.65787 5.62499L7.30377 5.27088C7.22309 5.19073 7.11398 5.14575 7.00025 5.14575C6.88653 5.14575 6.77742 5.19073 6.69674 5.27088L1.05982 10.9051C0.97715 10.9874 0.911813 11.0855 0.867667 11.1935C0.823521 11.3015 0.801462 11.4173 0.802791 11.534C0.80826 12.0152 1.20885 12.3994 1.6901 12.3994H2.27115V16.8523H11.7294V12.3994H12.3227C12.5565 12.3994 12.7766 12.3078 12.942 12.1424C13.0235 12.0612 13.088 11.9646 13.1319 11.8583C13.1758 11.752 13.1982 11.638 13.1977 11.523C13.1977 11.2906 13.1061 11.0705 12.9407 10.9051ZM7.76588 15.868H6.23463V13.0789H7.76588V15.868ZM10.745 11.415V15.868H8.64088V12.7508C8.64088 12.4486 8.39615 12.2039 8.094 12.2039H5.9065C5.60435 12.2039 5.35963 12.4486 5.35963 12.7508V15.868H3.25553V11.415H1.94303L7.00162 6.36053L7.31744 6.67635L12.0588 11.415H10.745Z"
      fill="currentColor"
      fillOpacity="0.85"
    />
  </svg>
);

export default function Block() {
  return (
    <div className="border rounded-md p-4 leading-4">
      <span className="align-middle">Block 1</span>
      {/* <span>Block 2</span> */}
      {/* 块级元素即使在行内元素（如<span>）内部，这意味着它会独占一行 */}
      <span>
        <LineIcon />
      </span>
    </div>
  );
}
