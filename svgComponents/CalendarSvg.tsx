import React from "react";

type Props = {
  w: string;
  h: string;
  className: string;
};

function CalendarSvg({ w, h, className }: Props) {
  return (
    <svg
      width={w}
      height={h}
      viewBox="0 0 1024 1024"
      className={className}
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M879.202137 168.133233H710.502696v-47.010671c0-13.80095-11.19721-25.002256-25.002256-25.002255-13.80095 0-25.002256 11.201305-25.002256 25.002255v47.010671H357.093318v-47.010671c0-13.80095-11.201305-25.002256-25.002256-25.002255-13.804022 0-25.002256 11.201305-25.002256 25.002255v47.010671H143.731998c-12.957269 0-23.437759 10.547043-23.437759 23.505335v712.811558c0 12.954197 10.48049 23.438783 23.437759 23.438782h735.470139c12.957269 0 23.505335-10.484586 23.505336-23.438782V191.638568c-0.001024-12.957269-10.548067-23.505335-23.505336-23.505335z"
        fill="#27323A"
      />
      <path
        d="M848.925848 874.238341h-129.111939c42.646872-13.150783 87.052778-31.512119 129.112963-56.904474v56.904474z"
        fill="#F4CE73"
      />
      <path
        d="M594.544611 867.078311c57.167613-32.165357 120.648503-77.025869 157.044555-113.681987 17.904683 16.081143 44.859488 30.535332 69.925224 40.433231-77.282864 43.882701-162.512103 64.394196-226.969779 73.248756z"
        fill="#FFFFFF"
      />
      <path
        d="M848.925848 769.2174c-25.979042-8.853536-75.655911-32.292319-82.949045-46.549923a16.484554 16.484554 0 0 0-12.827236-8.987665c-5.5341-0.650167-11.000624 1.49692-14.647703 5.664133-54.040667 62.830723-208.544963 153.464028-243.180956 154.894396H171.923657V465.028237h677.003215V769.2174z"
        fill="#F4CE73"
      />
      <path
        d="M848.925848 431.692578H171.923657V219.763674h135.166173v29.558546c-24.415569 9.897899-41.736637 33.792311-41.736638 61.724927 0 36.786152 29.885165 66.671317 66.671317 66.671317 36.722671 0 66.671317-29.885165 66.671317-66.671317 0-27.865039-17.251444-51.760475-41.603532-61.657351v-29.625098h303.40589v30.471852c-23.308749 10.417009-39.586478 33.725759-39.586478 60.810597 0 36.786152 29.885165 66.671317 66.671317 66.671317 36.722671 0 66.671317-29.885165 66.671317-66.671317 0-28.711792-18.358264-52.997328-43.752668-62.37407v-28.908379h138.423152v211.92788z"
        fill="#79CCBF"
      />
      <path
        d="M476.112819 686.07484c-13.280817 31.382085-23.048683 70.188363-29.234997 116.478218h78.719375c2.60374-33.205625 7.55013-62.047451 15.037804-86.46302 9.440223-31.448638 22.268482-59.834834 38.546211-85.422753 13.347369-21.095109 30.145232-40.693298 50.133521-58.664533v-53.257395H398.893436V585.28664h140.373654c-28.778345 35.872846-49.873454 69.406115-63.154271 100.7882z"
        fill="#F4CE73"
      />
    </svg>
  );
}

export default CalendarSvg;
