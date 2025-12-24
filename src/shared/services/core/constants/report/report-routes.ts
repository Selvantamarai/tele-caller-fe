import { NavigationExtras, Router } from '@angular/router';

export class ReportRoutes {
  public static Preview = 'Preview';
  public static host = 'htmlpreview';
  public static Report = 'Report';
  public static RepairComments = 'RepairComments';
  public static ProducerRating = 'ProducerRating';
  public static ProviderRating = 'ProviderRating';
  public static VendorRating = 'VendorRating';
  public static FourPointInspection = 'FourPointInspection';
  public static WindMitigationInspection = 'WindMitigationInspection';
  public static WDOInspection = 'WDOInspection';
  public static RoofInspection = 'RoofInspection';

  public static navigateToOrderPreview(
    router: Router,
    extras?: NavigationExtras
  ) {

    const link = router.serializeUrl(router.createUrlTree([ReportRoutes.Report, ReportRoutes.Preview], extras));
    window.open(link, '_blank');
    
  }
 
  public static navigateToProducerRating(
    router: Router,
    extras?: NavigationExtras
  ) {
    const link = router.serializeUrl(router.createUrlTree([ReportRoutes.host,ReportRoutes.Report, ReportRoutes.ProducerRating], extras));
    window.open(link, '_blank');
  }
  
  public static navigateToProviderRating(
    router: Router,
    extras?: NavigationExtras
  ) {
    const link = router.serializeUrl(router.createUrlTree([ReportRoutes.host,ReportRoutes.Report, ReportRoutes.ProviderRating], extras));
    window.open(link, '_blank');
  }
  public static navigateToVendorRating(
    router: Router,
    extras?: NavigationExtras
  ) {
    const link = router.serializeUrl(router.createUrlTree([ReportRoutes.host,ReportRoutes.Report, ReportRoutes.VendorRating], extras));
    window.open(link, '_blank');
  }
  public static navigateToFourPointInspection(
    router: Router,
    extras?: NavigationExtras
  ) {
    const link = router.serializeUrl(router.createUrlTree([ReportRoutes.host,ReportRoutes.Report, ReportRoutes.FourPointInspection], extras));
    window.open(link, '_blank');
  }
  public static navigateToRoofInspection(
    router: Router,
    extras?: NavigationExtras
  ) {
    const link = router.serializeUrl(router.createUrlTree([ReportRoutes.host,ReportRoutes.Report, ReportRoutes.RoofInspection], extras));
    window.open(link, '_blank');
  }
  public static navigateToRepairComments(
    router: Router,
    extras?: NavigationExtras
  ) {
    const link = router.serializeUrl(router.createUrlTree([ReportRoutes.host,ReportRoutes.Report, ReportRoutes.RepairComments], extras));
    window.open(link, '_blank');
  }

}