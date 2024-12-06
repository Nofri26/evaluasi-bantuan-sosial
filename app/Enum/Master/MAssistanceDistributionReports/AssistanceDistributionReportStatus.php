<?php

namespace App\Enum\Master\MAssistanceDistributionReports;

enum AssistanceDistributionReportStatus: string
{
    case PENDING = 'pending';
    case APPROVE = 'approve';
    case REJECT = 'reject';
}
